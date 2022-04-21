import {
  AdapterSession,
  AdapterUser,
  VerificationToken,
} from 'next-auth/adapters';
import api from '@/lib/axios/api';
import { Account } from 'next-auth';

export const miPokerAdapter = () => {
  return {
    async createUser(user: Omit<AdapterUser, 'id'>): Promise<AdapterUser> {
      const { data } = await api.post(`/api/user/create`, user);
      return data;
    },
    async getUser(id: string): Promise<AdapterUser | null> {
      const { data } = await api.get(`/api/user/${id}`);
      return data;
    },
    async getUserByEmail(email: string): Promise<AdapterUser | null> {
      const { data } = await api.get(`/api/user/email/${email}`);
      return data;
    },

    async getUserByAccount(
      providerAccountIdRequest: Pick<Account, 'provider' | 'providerAccountId'>,
    ): Promise<AdapterUser | null> {
      const { data } = await api.post(`/api/user/account`, {
        ...providerAccountIdRequest,
      });
      return data;
    },

    async updateUser(user: Partial<AdapterUser>): Promise<AdapterUser> {
      const { data } = await api.put(`/api/user/${user.id}`, user);
      return data;
    },

    async deleteUser(userId: string): Promise<AdapterUser> {
      const { data } = await api.delete(`/api/user/${userId}`);
      return data;
    },

    async linkAccount(account: Account): Promise<Account> {
      const { data } = await api.post(`/api/account/link`, account);

      return data;
    },

    async unlinkAccount(
      provider_providerAccountId: Pick<
        Account,
        'provider' | 'providerAccountId'
      >,
    ): Promise<any> {
      const { provider, providerAccountId } = provider_providerAccountId;
      const { data } = await api.delete(
        `/api/account/${provider}/${providerAccountId}`,
      );

      return data;
    },

    async getSessionAndUser(sessionToken: string): Promise<{
      session: AdapterSession;
      user: AdapterUser;
    } | null> {
      const { data } = await api.get(`/api/session/${sessionToken}`);
      const { user, session } = data;

      return {
        user,
        session: {
          ...session,
          expires: new Date(session.expires),
        },
      };
    },

    async createSession(session: {
      sessionToken: string;
      userId: string;
      expires: any;
    }): Promise<AdapterSession> {
      const { data } = await api.post(`/api/session/create`, session);

      return {
        ...data,
        expires: new Date(data.expires),
      };
    },

    async updateSession(
      session: Partial<AdapterSession> & Pick<AdapterSession, 'sessionToken'>,
    ): Promise<AdapterSession | null | undefined> {
      const { data } = await api.put(
        `/api/session/${session.sessionToken}`,
        session,
      );

      return {
        ...data,
        expires: new Date(data.expires),
      };
    },

    async deleteSession(sessionToken: string): Promise<any> {
      const { data } = await api.delete(`/api/session/${sessionToken}`);
      return data;
    },

    async createVerificationToken(
      verificationToken: VerificationToken,
    ): Promise<VerificationToken | null | undefined> {
      const { data } = await api.post(
        `/api/verification/create`,
        verificationToken,
      );

      return data;
    },

    async useVerificationToken(params: {
      identifier: string;
      token: string;
    }): Promise<VerificationToken | null> {
      const { data } = await api.post(`/api/verification/use`, params);

      return data;
    },
  };
};
